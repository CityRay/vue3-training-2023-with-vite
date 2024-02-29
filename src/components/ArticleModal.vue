<template>
  <div class="modal fade" id="articleModal" tabindex="-1" role="dialog" aria-labelledby="articleModalLabel"
    aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="articleModalLabel">
            <span v-if="isNew">新增貼文</span>
            <span v-else>編輯貼文</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control" id="title" v-model="tempArticle.title" placeholder="請輸入標題" />
              </div>
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image" v-model="tempArticle.imageUrl" placeholder="請輸入圖片連結" />
              </div>
              <div class="mb-3">
                <label for="author" class="form-label">作者</label>
                <input type="text" class="form-control" id="author" v-model="tempArticle.author" placeholder="請輸入標題" />
              </div>
              <div class="mb-3">
                <label for="create_at">文章建立日期</label>
                <input type="date" class="form-control" id="create_at" v-model="createAt" />
              </div>
            </div>

            <div class="col-sm-8">
              <label for="tag" class="form-label">標籤</label>
              <div class="row gx-1 mb-3">
                <template v-if="Array.isArray(tempArticle?.tag)">
                  <div class="col-md-2 mb-1" v-for="(label, key) in tempArticle.tag" :key="key">
                    <div class="input-group input-group-sm">
                      <input type="text" class="form-control form-control" id="tag" v-model="tempArticle.tag[key]"
                        placeholder="請輸入標籤" />
                      <button type="button" class="btn btn-outline-danger" @click="tempArticle.tag.splice(key, 1)">
                        <i class="bi bi-x"></i>
                      </button>
                    </div>
                  </div>
                  <div class="col-md-2 mb-1"
                    v-if="tempArticle.tag[tempArticle.tag.length - 1] || !tempArticle.tag.length">
                    <button class="btn btn-outline-primary btn-sm d-block w-100" type="button"
                      @click="tempArticle.tag.push('')">
                      新增標籤
                    </button>
                  </div>
                </template>
              </div>
              <div class="mb-3">
                <label for="description" class="form-label">文章描述</label>
                <textarea type="text" class="form-control" id="description" v-model="tempArticle.description"
                  placeholder="請輸入文章描述"></textarea>
              </div>
              <div class="mb-3 my-editor">
                <ckeditor :editor="editor" :config="editorConfig" v-model="tempArticle.content"></ckeditor>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox" v-model="tempArticle.isPublic" id="isPublic" />
                  <label class="form-check-label" for="isPublic">
                    是否公開
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary" @click="updateArticle">
            {{ isNew ? '新增貼文' : '更新貼文' }}
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import ClassicEditor from '@ckeditor/ckeditor5-build-classic';

import modalMixin from '@/utils/modalMixin.js';

export default {
  mixins: [modalMixin],
  props: {
    article: {
      type: Object,
      default() {
        return {
        };
      }
    },
    isNew: {
      type: Boolean,
      default: true
    }
  },
  data() {
    return {
      tempArticle: {
        author: '',
        title: '',
        content: '',
        description: '',
        isPublic: false,
        imageUrl: '',
        create_at: '',
        tag: []
      },
      createAt: '',
      // https://ckeditor.com/docs/ckeditor5/latest/builds/guides/integration/frameworks/vuejs-v3.html#editor
      editor: ClassicEditor,
      editorConfig: {
        toolbar: ['heading', 'bold', 'italic', '|', 'link']
      }
    };
  },
  mounted() {
    this.tempArticle = JSON.parse(JSON.stringify(this.article));
  },
  watch: {
    article() {
      this.tempArticle = JSON.parse(JSON.stringify(this.article));
      if (!Array.isArray(this.tempArticle.tag)) {
        this.tempArticle.tag = [];
      }

      if (this.isNew) {
        // 寫入今天的日期
        this.createAt = new Date().toISOString().split('T')[0];
      } else {
        const dateAndTime = new Date(this.tempArticle.create_at * 1000).toISOString().split('T');
        // 另可這樣寫 [this.createAt, this.createAtTime] = dateAndTime
        this.createAt = dateAndTime[0];
      }
    }
  },
  methods: {
    updateArticle() {
      this.tempArticle.create_at = Math.floor(new Date(this.createAt).getTime() / 1000);

      this.$emit('update-article', this.isNew, this.tempArticle);
    }
  }
};
</script>

<style>
.my-editor div[contenteditable] {
  min-height: 300px;
}
</style>

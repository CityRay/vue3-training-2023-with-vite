<template>
  <VeeForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="onFormSubmit">
    <!-- <code> {{ errors }} </code> -->
    <div class="mb-3">
      <label for="email" class="form-label">Email</label>
      <VeeField id="email" name="Email" type="email" class="form-control" :class="{ 'is-invalid': errors['Email'] }"
        placeholder="請輸入 Email" rules="email|required" v-model="form.user.email"></VeeField>
      <ErrorMessage name="Email" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="name" class="form-label">收件人姓名</label>
      <VeeField id="name" name="姓名" type="text" class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
        placeholder="請輸入姓名" rules="required|min:2|max:10" v-model="form.user.name"></VeeField>
      <ErrorMessage name="姓名" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="tel" class="form-label">收件人電話</label>
      <VeeField id="tel" name="電話" type="text" class="form-control" :class="{ 'is-invalid': errors['電話'] }"
        placeholder="請輸入電話" :rules="isPhoneRule" v-model="form.user.tel" maxlength="10"></VeeField>
      <ErrorMessage name="電話" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="address" class="form-label">收件人地址</label>
      <VeeField id="address" name="地址" type="text" class="form-control" :class="{ 'is-invalid': errors['地址'] }"
        placeholder="請輸入地址" rules="required" v-model="form.user.address"></VeeField>
      <ErrorMessage name="地址" class="invalid-feedback"></ErrorMessage>
    </div>

    <div class="mb-3">
      <label for="message" class="form-label">留言</label>
      <VeeField as="textarea" id="message" name="message" class="form-control" cols="30" rows="10" v-model="form.message">
      </VeeField>
    </div>
    <div class="text-end">
      <button type="submit" class="btn btn-warning me-3" @click="cleanFrom" v-if="!!cart.carts?.length">
        重新輸入
      </button>
      <button type="submit" class="btn btn-danger" :disabled="!cart.carts?.length">
        {{ !cart.carts?.length ? '請先購物' : '送出訂單' }}
      </button>
    </div>
  </VeeForm>
</template>

<script>
const userModel = {
  name: '',
  email: '',
  tel: '',
  address: ''
};

export default {
  props: {
    cart: {
      type: Object,
      default: () => ({})
    }
  },
  data() {
    return {
      form: {
        user: { ...userModel },
        message: ''
      }
    };
  },
  methods: {
    onFormSubmit() {
      this.$emit('submit-form', this.form, () => {
        this.cleanFrom();
      });
    },
    cleanFrom() {
      // console.log('cleanFrom', this.$refs.form);
      this.$refs.form.resetForm();
    },
    isPhoneRule(value) {
      const phoneNumber = /^(09)[0-9]{8}$/;
      return phoneNumber.test(value) ? true : '需要正確的電話號碼';
    }
  }
};
</script>

<style lang="scss" scoped>
</style>

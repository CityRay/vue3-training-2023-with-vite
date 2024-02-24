import BsModal from 'bootstrap/js/dist/modal';

export default {
  data() {
    return {
      modal: null
    };
  },
  methods: {
    openModal() {
      this.modal && this.modal.show();
    },
    hideModal() {
      this.modal && this.modal.hide();
    }
  },
  mounted() {
    this.modal = new BsModal(this.$refs.modal);
  }
};

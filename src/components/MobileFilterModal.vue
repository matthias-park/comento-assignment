<template>
  <transition name="modal-fade">
    <div class="modal-backdrop">
      <div
        class="modal"
        role="dialog"
        aria-labelledby="modalTitle"
        aria-describedby="modalDescription"
      >
        <header class="modal-header">
          <p name="header" id="modalTitle">필터</p>
          <button type="button" class="btn-close" @click="close" aria-label="Close modal">x</button>
        </header>
        <section class="modal-body" id="modalDescription">
          <slot name="body">
            <div v-for="item in items" :key="item.id">
              <div class="ui checkbox">
                <input
                  type="checkbox"
                  :name="item.name"
                  :checked="item.checked"
                  @click="selectCategory(item)"
                />
                <label>{{ item.name }}</label>
              </div>
            </div>
          </slot>
        </section>
        <footer class="modal-footer">
          <slot name="footer">
            <button class="ui green button" @click="save" aria-label="Close modal">저장하기</button>
          </slot>
        </footer>
      </div>
    </div>
  </transition>
</template>

<script>
import { mapActions, mapGetters } from "vuex";

export default {
  name: "MobileFilterModal",
  components: {},
  data() {
    return {
      active: false,
      category: []
    };
  },
  computed: {
    ...mapGetters(["getCategory"]),
    items() {
      return this.getCategory;
    }
  },
  methods: {
    ...mapActions(["fetchCategory", "fetchFeeds"]),
    save() {
      this.$emit("categorySelect", this.category);
      this.$emit("close");
    },
    selectCategory(item) {
      const index = this.category.indexOf(item);
      this.category[index].checked = !this.category[index].checked;
    },
    close() {
      this.$emit("close");
    }
  },
  async created() {
    await this.fetchCategory();
    this.category = this.getCategory;
  }
};
</script>

<style scoped>
.modal-backdrop {
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
}

.modal {
  background: #ffffff;
  box-shadow: 2px 2px 20px 1px;
  overflow-x: auto;
  display: flex;
  flex-direction: column;
  width: 337px !important;
}

.modal-header,
.modal-footer {
  padding: 15px;
  display: flex;
}

.modal-header {
  justify-content: space-between;
  padding-top: 0;
  padding-bottom: 0;
}
#modalTitle {
  font-size: 22px;
  font-weight: bold;
  margin-bottom: 0;
  margin-top: 2em;
}

#modalDescription {
  padding: 0 0 0 15px;
}

.modal-footer {
  justify-content: flex-end;
}

.modal-body {
  position: relative;
  padding: 20px 10px;
}

.btn-close {
  height: 12px;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: #adb5bd;
  background: transparent;
}
</style>

const center = {
  install: (Vue: any) => { }
};
let listenAction;
center.install = Vue => {
  Vue.directive('center', {
    inserted(el: any, binding: any) {


    },
    update(el: any) {
      el.children[0].style.cssText += "top:" + (document.documentElement.clientHeight - el.clientHeight) / 2 + "px;";
    },
    unbind() {

    }
  });
};

export default center;

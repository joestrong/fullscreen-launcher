"use strict";

const keyCodes = {
  'rightArrow': 39,
  'leftArrow': 37
};

class Menu {

  constructor() {
    this.container = document.querySelector('.container');
    this.direction = 0;
    this.initEvents();
  }

  initEvents() {
    document.addEventListener('keydown', this.onKeydown.bind(this));
  }

  onKeydown(e) {
    if(!this.lockKeys) {
      if (e.keyCode === keyCodes.rightArrow) {
        this.moveRight();
      }
      if (e.keyCode === keyCodes.leftArrow) {
        this.lockKeys = true;
        this.moveLeft();
      }
    }
  }

  moveLeft() {
    this.lockKeys = true;
    const transitionEnd = () => {
      this.container.style.transition = "none";
      this.container.removeEventListener('transitionend', transitionEnd);
      this.lockKeys = false;
    };
    this.container.style.transform = "translateX(-100%)";
    let firstChild = this.container.children[0];
    let lastChild = this.container.children[this.container.children.length - 1];
    this.container.insertBefore(lastChild, firstChild);
    requestAnimationFrame(() => {
      this.container.addEventListener('transitionend', transitionEnd);
      this.container.style.transition = "transform .5s ease-in-out";
      this.container.style.transform = "translateX(0)";
    });
  }

  moveRight() {
    this.lockKeys = true;
    const transitionEnd = () => {
      let firstChild = this.container.children[0];
      this.container.appendChild(firstChild);
      this.container.style.transition = "none";
      this.container.style.transform = "translateX(0)";
      this.container.removeEventListener('transitionend', transitionEnd);
      this.lockKeys = false;
    };
    this.container.addEventListener('transitionend', transitionEnd);
    this.container.style.transition = "transform .5s ease-in-out";
    this.container.style.transform = "translateX(-100%)";
  }
}

new Menu();

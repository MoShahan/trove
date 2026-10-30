import "@testing-library/jest-dom";

jest.mock("next/image", () => {
  const React = require("react");
  return {
    __esModule: true,
    default: (props) => {
      const { priority, fill, ...rest } = props;
      return React.createElement("img", rest);
    },
  };
});

jest.mock("next/font/google", () => ({
  League_Spartan: () => ({ style: { fontFamily: "sans-serif" } }),
}));

class ResizeObserverMock {
  observe() {}
  unobserve() {}
  disconnect() {}
}

class IntersectionObserverMock {
  constructor(callback) {
    this.callback = callback;
    IntersectionObserverMock.instances.push(this);
  }

  observe() {}

  unobserve() {}

  disconnect() {}
}

IntersectionObserverMock.instances = [];

global.ResizeObserver = ResizeObserverMock;
global.IntersectionObserver = IntersectionObserverMock;

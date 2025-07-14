import { register } from '@canva/apps';

register('loader', () => {
  return {
    render: ({ container }) => {
      const el = document.createElement("div");
      el.innerText = "Hello from my Canva app!";
      el.style.fontSize = "24px";
      el.style.color = "black";
      container.appendChild(el);
    },
  };
});

import { register } from '@canva/apps';

register('loader', () => {
  return {
    render: ({ container }) => {
      const el = document.createElement("div");
      el.innerText = "CVMaker.AI Canva Integration";
      el.style.fontSize = "24px";
      el.style.color = "black";
      el.style.textAlign = "center";
      el.style.padding = "20px";
      container.appendChild(el);
      
      // Add a button for CV generation
      const button = document.createElement("button");
      button.innerText = "Generate CV";
      button.style.marginTop = "20px";
      button.style.padding = "10px 20px";
      button.style.backgroundColor = "#007bff";
      button.style.color = "white";
      button.style.border = "none";
      button.style.borderRadius = "5px";
      button.style.cursor = "pointer";
      
      button.onclick = () => {
        alert("CV generation feature coming soon!");
      };
      
      container.appendChild(button);
    },
  };
});

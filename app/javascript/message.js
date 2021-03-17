function message() {
  const submit = document.getElementById("submit");
  submit.addEventListener("click", (e) => {
    const formData = new FormData(document.getElementById("form"));
    const XHR = new XMLHttpRequest();
    XHR.open("POST", "/messages", true);
    XHR.responseType = "json";
    XHR.send(formData);
    XHR.onload = () => {
      if (XHR.status != 200) {
        alert(`Error ${XHR.status}: ${XHR.statusText}`);
        return null;
      }
      const message = XHR.response.post;
      const list = document.getElementById("messages");
      const formText = document.getElementById("message_text");
      const newImage = document.getElementById('message_image');
      const HTML = `
      <div class="message">
        <div class="upper-message">
          <div class="message-user">
            ${ message.user_name }
          </div>
          <div class="message-date">
            ${ message.created_at }
          </div>
        </div>
        <div class="lower-message">
          <div class="message-content">
            ${ message.content }
          </div>
          <div class="message-image">
            ${ message.image}
          </div>
        </div>
      </div>
      `;
      list.insertAdjacentHTML("beforeend", HTML);
      formText.value = "";
      newImage.value = "";
    };
    e.preventDefault();
  });
 }
 window.addEventListener("load", message);
 
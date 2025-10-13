document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contact-form");
  const formStatus = document.getElementById("form-status");
  const submitBtn = document.getElementById("submit-btn");

  if (!contactForm) {
    console.error("No se encontró #contact-form");
    return;
  }

  const API_ENDPOINT = "https://api.escuelaviva.ar/contact";

  contactForm.addEventListener(
    "submit",
    async (event) => {
      event.preventDefault();
      event.stopPropagation();

      const formData = new FormData(contactForm);
      const payload = {
        name: formData.get("name"),
        email: formData.get("email"),
        subject: formData.get("subject"),
        message: formData.get("message")
      };

      const originalBtnText = submitBtn.textContent;
      submitBtn.disabled = true;
      submitBtn.textContent = "Enviando...";
      formStatus.className = "";
      formStatus.style.display = "none";

      try {
        const res = await fetch(API_ENDPOINT, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        });

        const data = await res.json().catch(() => ({}));
        if (!res.ok) {
          const msg = Array.isArray(data?.message)
            ? data.message.join(", ")
            : data?.message;
          throw new Error(msg || "Hubo un problema con el envío.");
        }

        formStatus.className = "success";
        formStatus.textContent = data.message || "¡Mensaje enviado con éxito!";
        formStatus.style.display = "block";
        contactForm.reset();
      } catch (err) {
        formStatus.className = "error";
        formStatus.textContent =
          err?.message || "Error al enviar. Por favor, intentá de nuevo.";
        formStatus.style.display = "block";
        console.error(err);
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = originalBtnText;
      }
    },
    { capture: true }
  ); // <- intercepta antes que otros handlers
});

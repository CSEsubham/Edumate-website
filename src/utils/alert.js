// utils/alerts.js
import Swal from 'sweetalert2';

export const showToast = (title = "Success", icon = "success") => {
  Swal.fire({
    toast: true,
    icon,
    title,
    position: "top-end",
    showConfirmButton: false,
    timer: 3000,
    background: "#ffffff",
    color: "#333",
    customClass: {
      popup: "animated-toast",
    },
  });
};

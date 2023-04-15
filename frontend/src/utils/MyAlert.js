import Swal from "sweetalert2";

const MyAlert = (title, showConfirmButton, icon) => {
    if (showConfirmButton) {
        Swal.fire({
            heightAuto:false,
            icon: icon,
            title: `<strong>${title}</strong>`,
            confirmButtonText: 'OK'
        });
    }else{
        const Toast = Swal.mixin({
            toast: true,
            position: 'top-end',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
              toast.addEventListener('mouseenter', Swal.stopTimer)
              toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
          })
          Toast.fire({
            icon: icon,
            customClass: {
              container: 'swal-custom-container'  //css file in home.css
            },
            title: title
          })
    }

}

export default MyAlert;
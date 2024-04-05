const usuariosInicio = JSON.parse(localStorage.getItem("usuarios"));
const formInicio = document.querySelectorAll(".form--valores");
const userInicio = formInicio[0];
const contraseniaInicio = formInicio[1];
const submitInicio = formInicio[2];


submitInicio.addEventListener("click",(e)=>{
    e.preventDefault();
    let usuarioEncontrado = usuariosInicio.find((usuario)=>{
        return (usuario.usuario == userInicio.value &&  usuario.contraseña == contraseniaInicio.value);
    })
    if (usuarioEncontrado) {
        location.href= "../PAGES/productos.html";
    }else{
        Swal.fire({
            title: "<strong>Usuario No encontrado</strong>",
            icon: "warning",
            html: `
            `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: `
            Intentar nuevamente
            `,
        });
    }

});



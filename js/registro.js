const form = document.querySelector(".form-registro"),
    nombre = form[0],
    nombreUsuario = form[1],
    contrasenia = form[2],
    email = form[3];

const warning = document.querySelector(".warning");


// crea un array o setea un array dependiendo de si ya existia o no;


const usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];




class User {
    constructor(nombre, usuario, contraseña, email) {
        this.nombre = nombre;
        this.usuario = usuario;
        this.contraseña = contraseña;
        this.email = email;
    }
}



function agregarAArrUsuario(usuario) {
    return usuarios.push(usuario);
}

function guardarEnLocalStorage(array) {
    localStorage.setItem("usuarios", JSON.stringify(array))
}

function validarMayuscula(contraseña){
    let array = contraseña.split("");
    let letraMayuscula = false;

    for (const char of array) {
            if (/[A-Z]/.test(char)) {
                letraMayuscula = true;
                break;
            };
            
    }
    return letraMayuscula;
}


function verificarNoRepetidos(key, nombredeUsuario){
    if ((usuarios.length != 0)) {
        let arrayUsuarios =JSON.parse(localStorage.getItem(key))
        let encuentro = arrayUsuarios.find((el)=>{
            return el.usuario == nombredeUsuario.value;
        })
        if (encuentro != undefined) {
            return true;
        }
        else{
            return false;
        }
    } 
}    




form.addEventListener("submit", (e) => {
    e.preventDefault();
    let aviso = "";
    let entrar = false;
    if (nombreUsuario.value.length < 6) {
        aviso += '<p class="cambioColor"><span>el  nombre de usuario es demasiado corto como minimo 6 caracteres</span></p> <br>';
        entrar = true;
    }
    if (contrasenia.value.length <6 || !validarMayuscula(contrasenia.value)) {
        aviso += '<p class="cambioColor"><span>la contraseña es demasiado corta como minimo 6 caracteres y una mayuscula </span></p><br>';
        entrar = true;
    }
    if(verificarNoRepetidos("usuarios", nombreUsuario)){
        aviso+= '<p class="cambioColor"><span>Ese nombre de usuario ya existe</span></p><br>';
        entrar = true;
    }
    if (!entrar /* debe tomar el falso */) {
        const nuevoUsuario = new User(nombre.value, nombreUsuario.value, contrasenia.value, email.value);
        agregarAArrUsuario(nuevoUsuario);
        guardarEnLocalStorage(usuarios);
        Swal.fire("Usted Ha Sido Registrado");        
    }else  /* solo si entrar = true */{
        Swal.fire({
            title: "<strong>Cuidado!!</strong>",
            icon: "warning",
            html: `
            ${aviso}
            `,
            showCloseButton: true,
            focusConfirm: false,
            confirmButtonText: `
            Intentar nuevamente
            `,
        }); 
    }
});




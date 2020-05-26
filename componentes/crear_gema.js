var CrearGema = Vue.component('CrearGema', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombre: null,
            poder: null,
            portador: null,
            ubicacion: null
        }
    },
    // Aquí comienza nuestro template
    template: `
    <div>
    <section class="nueva">
    <p v-if="errores.length">
    <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
    <ul>
    <li v-for="error in errores" style="color:red;">{{ error }}</li>
    </ul>
    </p>
    <p>
    <label for="nombre">Nombre</label><br>
    <input id="nombre" v-model="nombre" type="text">
    </p>
    <p>
    <label for="poder">Poder</label><br>
    <input id="poder" v-model="poder" type="text">
    </p>
    <p>
    <label for="portador">Portador</label><br>
    <input id="portador" v-model="portador" type="text">
    </p>
    <p>
    <label for="ubicacion">Ubicacion</label><br>
    <input id="ubicacion" v-model="ubicacion" type="text">
    </p>
    <p>
    <button v-on:click="validarFormulario(), crear_gema(nombre, poder,
        portador, ubicacion) ">Agregar Gema</button>
    </p>
    </section>
    </div>`, // Aca termina nuestro Template

    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida el formulario
            this.errores = [];
            if (!this.nombre) {
                this.errores.push("El Nombre es obligatorio.");
            }
            if (!this.poder) {
                this.errores.push("El campo poder es obligatorio.");
            }
            if (!this.portador) {
                this.errores.push("El campo portador es obligatorio.");
            }
            if (!this.errores.length) {
                return true;
            }
        },
        crear_gema: function (nombre, poder,
            portador, ubicacion) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.post('https://gemas-infi.firebaseio.com/gemas.json', {
                    nombre: nombre,
                    poder: poder,
                    portador: portador,
                    ubicacion: ubicacion,
                })
                    .then((response) => {
                        alert("Se Agregó a la Lista Exitosamente");
                        router.push({ name: "Gemas" });
                    }
                    ).catch((err) => {
                        self.loading = false;
                        console.log(err);
                    });
            }
        } // fin metodo crear_vengador
    } // Terminan los Métodos
})
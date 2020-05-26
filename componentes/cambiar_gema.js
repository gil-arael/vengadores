var CambiarGema = Vue.component('CambiarGema', {
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
    <button v-on:click="validarFormulario(), cambiar_gema(nombre, poder,
        portador, ubicacion) ">Guardar Cambios</button>
    </p>
    </section>
    </div>`, // Aca termina nuestro Template
    mounted() {
        let self = this;
        fetch('https://gemas-infi.firebaseio.com/gemas/' + this.
            $route.params.id + '.json')
            .then(r => r.json())
            .then(json => {
                self.nombre = json.nombre,
                    self.poder = json.poder,
                    self.portador = json.portador,
                    self.ubicacion = json.ubicacion
            });
    },
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
        cambiar_gema: function (nombre, poder,
            portador, ubicacion) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.put('https://gemas-infi.firebaseio.com/gemas/' + this.
                    $route.params.id + '.json', {
                    nombre: nombre,
                    poder: poder,
                    portador: portador,
                    ubicacion: ubicacion,
                }).then((response) => {
                    alert("Datos del las gemas Modificados Exitosamente");
                    router.push({ name: "Gemas" });
                }).catch((err) => {
                    self.loading = false; console.log(err);
                });
            }
        } // fin metodo cambiar_alumno
    } // Terminan los Métodos
})
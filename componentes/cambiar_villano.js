var CambiarVillano = Vue.component('CambiarVillano', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombre: null,
            superpoder: null,
            origen: null,
            derrotadopor: null
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
    <label for="superpoder">Superpoder</label><br>
    <input id="superpoder" v-model="superpoder" type="text">
    </p>
    <p>
    <label for="origen">Origen</label><br>
    <input id="origen" v-model="origen" type="text">
    </p>
    <p>
    <label for="derrotadopor">Derrotado Por</label><br>
    <input id="derrotadopor" v-model="derrotadopor" type="text">
    </p>
    <p>
    <button v-on:click="validarFormulario(), cambiar_villano(nombre, superpoder,
        origen, derrotadopor) ">Guardar Cambios</button>
    </p>
    </section>
    </div>`, // Aca termina nuestro Template
    mounted() {
        let self = this;
        fetch('https://villanos-ven.firebaseio.com/villanos/' + this.
            $route.params.id + '.json')
            .then(r => r.json())
            .then(json => {
                self.nombre = json.nombre,
                    self.superpoder = json.superpoder,
                    self.origen = json.origen,
                    self.derrotadopor = json.derrotadopor
            });
    },
    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida el formulario
            this.errores = [];
            if (!this.nombre) {
                this.errores.push("El Nombre es obligatorio.");
            }
            if (!this.superpoder) {
                this.errores.push("El campo superpoder es obligatorio.");
            }
            if (!this.origen) {
                this.errores.push("El campo origen es obligatorio.");
            }
            if (!this.errores.length) {
                return true;
            }
        },
        cambiar_villano: function (nombre, superpoder,
            origen, derrotadopor) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.put('https://villanos-ven.firebaseio.com/villanos/' + this.
                    $route.params.id + '.json', {
                    nombre: nombre,
                    superpoder: superpoder,
                    origen: origen,
                    derrotadopor: derrotadopor,
                }).then((response) => {
                    alert("Datos del los villanos Modificados Exitosamente");
                    router.push({ name: "Villanos" });
                }).catch((err) => {
                    self.loading = false; console.log(err);
                });
            }
        } // fin metodo cambiar_alumno
    } // Terminan los Métodos
})
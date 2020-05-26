var CrearVillano = Vue.component('CrearVillano', {
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
    <button v-on:click="validarFormulario(), crear_villano(nombre, superpoder,
        origen, derrotadopor) ">Agregar Villano</button>
    </p>
    </section>
    </div>`, // Aca termina nuestro Template

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
        crear_villano: function (nombre, superpoder,
            origen, derrotadopor) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.post('https://villanos-ven.firebaseio.com/villanos.json', {
                    nombre: nombre,
                    superpoder: superpoder,
                    origen: origen,
                    derrotadopor: derrotadopor,
                })
                    .then((response) => {
                        alert("Se Agregó a la Lista Exitosamente");
                        router.push({ name: "Villanos" });
                    }
                    ).catch((err) => {
                        self.loading = false;
                        console.log(err);
                    });
            }
        } // fin metodo crear_vengador
    } // Terminan los Métodos
})
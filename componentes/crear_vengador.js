var CrearVengador = Vue.component('CrearVengador', {
    data: function () { //Declaración de la Data
        return {
            errores: [],
            nombres: null,
            apellidos: null,
            nombredesuperheroe: null,
            superpoder: null,
            trabajoactual: null,
            telefono: null,
            email: null
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
    <label for="nombres">Nombres</label><br>
    <input id="nombres" v-model="nombres" type="text">
    </p>
    <p>
    <label for="apellidos">Apellidos</label><br>
    <input id="apellidos" v-model="apellidos" type="text">
    </p>
    <p>
    <label for="nombredesuperheroe">nombre de superheroe</label><br>
    <input id="nombredesuperheroe" v-model="nombredesuperheroe" type="text">
    </p>
    <p>
    <label for="superpoders">superpoder</label><br>
    <input id="superpoder" v-model="superpoder" type="text">
    </p>
    <p>
    <label for="trabajoactual">trabajo actual</label><br>
    <input id="trabajoactual" v-model="trabajoactual" type="text">
    </p>
    <p>
    <label for="telefono">telefono</label><br>
    <input id="telefono" v-model="telefono" type="text">
    </p>
    <p>
    <label for="email">Email</label><br>
    <input id="email" v-model="email" type="text">
    </p>
    <p>
    <button v-on:click="validarFormulario(), crear_vengador(nombres, apellidos,
        nombredesuperheroe, superpoder, trabajoactual, telefono, email) ">Agregar Vengador</button>
    </p>
    </section>
    </div>`, // Aca termina nuestro Template

    methods: { //Inician los Métodos
        validarFormulario: function (e) { //iniciamos la Funcion que valida el formulario
            this.errores = [];
            if (!this.nombres) {
                this.errores.push("El Nombre es obligatorio.");
            }
            if (!this.apellidos) {
                this.errores.push("El Apellido es obligatorio.");
            }
            if (!this.superpoder) {
                this.errores.push("El superpoder es obligatorio.");
            }
            if (!this.telefono) {
                this.errores.push("El telefono es obligatorio.");
            }
            if (!this.email) {
                this.errores.push("El email es obligatorio.");
            }
            if (!this.errores.length) {
                return true;
            }
        },
        validarCorreo: function (email) {
            var re = /^.+@vengadores.com$/;
            return re.test(email);
          },
        crear_vengador: function (nombres, apellidos,
            nombredesuperheroe, superpoder, trabajoactual, telefono, email) {
            if (!(Array.isArray(this.errores) && this.errores.length)) {
                let self = this;
                axios.post('https://consumo-api-f23b8.firebaseio.com/vengadores.json', {
                    nombres: nombres,
                    apellidos: apellidos,
                    nombredesuperheroe: nombredesuperheroe,
                    superpoder: superpoder,
                    trabajoactual: trabajoactual,
                    telefono: telefono,
                    email: email,
                })
                    .then((response) => {
                        alert("Se Agregó a la Lista Exitosamente");
                        router.push({ name: "Vengadores" });
                    }
                    ).catch((err) => {
                        self.loading = false;
                        console.log(err);
                    });
            }
        } // fin metodo crear_vengador
    } // Terminan los Métodos
})
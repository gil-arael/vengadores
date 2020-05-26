Vue.component('formula', {
    data: function () {  //Declaración de la Data
      return {
           errores: [],
           seleccionado: '',
           vengadores: [],
          superheroe: null,
          descripcion: null,
          telefono: null,
          email: null
      }
    },
    // Aquí comienza nuestro template
    template: ` 
    <div>
    <form
    id="app"
    @submit="validarFormulario"
    method="post"
    action="./app.html#/contacto"
    novalidate="true">
    <p v-if="errores.length">
      <b>Por favor, corrija el(los) siguiente(s) error(es):</b>
      <ul>
        <li v-for="error in errores" style="color:red;">{{ error }}</li>
      </ul>
    </p>
    <p>
    <label for="superheroe">SuperHeroe</label><br>
    <select v-model="seleccionado">Superheroes
    <option v-for="option in vengadores" :value="option">{{option.nombres}}</option>
    </select>
  </p>
    <p>
      <label for="descripcion">Descripcion</label><br>
      <input id="descripcion" v-model="descripcion" type="text" nombre="nombre">
    </p>
  
    <p>
      <label for="telefono">Telefono</label><br>
      <input id="telefono" v-model="telefono"  nombre="telefono">
    </p>
    
    <p>
    <label for="email">Email</label><br>
    <input id="email" v-model="email" nombre="telefono">
    </p>
  
    <p>
      <input type="submit" value="Enviar">
    </p>
  </form>
  </div>`,

  mounted() {
    let self = this;
    console.log('aqui');
    fetch('https://consumo-api-f23b8.firebaseio.com/vengadores.json')
        .then(r => r.json())
        .then(json => {
            self.vengadores = json;
            console.log(self.vengadores);
        });
},

  // Aca termina nuestro Template
  methods: {  //Inician los Métodos
      validarFormulario: function (e) { //iniciamos la Funcion que valida el formulario
        this.errores = [];
  
        if (!this.telefono) {
          this.errores.push("El Teléfono es obligatorio.");
        }
        if (!this.email) {
          this.errores.push('El correo electrónico es obligatorio.');
        } else if (!this.validarCorreo(this.email)) {
          this.errores.push('El correo electrónico debe ser válido.');
        }
  
        if (!this.errores.length) {
          return true;
        }
  
        e.preventDefault();
      },
      validarCorreo: function (email) {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(email);
      }
    } // Terminan los Métodos
  })
  
   
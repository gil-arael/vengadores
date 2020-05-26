var Vengadores = Vue.component('Vengadores',
    {
        template: `
<div>
<section class="nueva">
<h1 class="titulo">Vengadores</h1>
<div class="row" v-for="(option, index, itemObjKey) in vengadores" :value="option">
                <div class="col-xl-6 col-md-6 col-lg-6">
                    <div class="vengadores d-flex align-items-center">
                    <div class="images">
                    <img  v-bind:src="images[itemObjKey]">
                  
                    </div>
                        <div class="info">
                            <h3>Nombre</h3><h1>{{option.nombres}}</h1>
                            <h3>apellido</h3><h1>{{option.apellidos}}</h1>
                            <h3>Nombre de super heroe</h3><h1>{{option.nombredesuperheroe}}</h1>
                            <h3>SuperPoder</h3><h1>{{option.superpoder}}</h1>
                            <h3>Trabajo Actual</h3><h1>{{option.trabajoactual}}</h1>
                            <h3>Telefono</h3><h1>{{option.telefono}}</h1>
                            <h3>Email</h3><h1>{{option.email}}</h1>
                            <div clas="cambiar"><a href="/cambiar_vengador"></a>
                             <router-link class="nav-link" :to="{ name: 'cambiar_vengador', params: { id:
                              index }}"> <button>Editar</button> </router-link>
                             <button class="btn btn-warning" v-on:click="eliminar_vengador(index) ">Eliminar</button>
                             </div>
                        </div>
                    </div>
                </div>
                </div>
<a href="/crear_vengador"></a>
<router-link class="nav-link" to="/crear_vengador"> <button>Agregar Vengador</button>
</router-link>
</section>
</div>
`,

        data: function () {
            return {
                vengadores: [],
            }
        },
        data() {
            return {
                vengadores: [],
                images: ['https://xoandelugo.org/wp-content/uploads/2018/06/capitan-america.jpg', 
                'https://blogdesuperheroes.es/wp-content/plugins/BdSGallery/BdSGaleria/94344.jpg',
                'https://files.rcnradio.com/public/styles/image_834x569/public/2019-04/1529877163-whatsapp-image-2018-06-24-at-174009.jpg?itok=r3cJYu81']
            }
        },
        mounted() {
            let self = this;
            fetch('https://consumo-api-f23b8.firebaseio.com/vengadores.json')
                .then(r => r.json())
                .then(json => {
                    self.vengadores = json;
                });
        },
        methods: { //Inician los Métodos
            eliminar_vengador: function (id) {
                let self = this;
                axios.delete('https://consumo-api-f23b8.firebaseio.com/vengadores/' + id
                    + '.json')
                    .then((response) => {
                        alert("El Vengador Fue Eliminado");
                        location.reload();
                    }).catch((err) => {
                        self.loading = false; console.log(err);
                    });
            } // fin metodo eliminar_alumno
        }
    });
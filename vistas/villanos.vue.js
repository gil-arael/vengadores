var Villanos = Vue.component('Villanos',
    {
        template: `
<div>
<section class="nueva">
<h1>Villanos</h1>
<table class="table">
<thead>
<tr>
<th scope="col">Nombre</th>
<th scope="col">Superpoder</th>
<th scope="col">Origen</th>
<th scope="col">Derrotado por</th>
</tr>
</thead>
<tbody>
<tr v-for="(item, index) in villanos">
<td>{{ item.nombre }}</td>
<td>{{ item.superpoder }}</td>
<td>{{ item.origen }}</td>
<td>{{ item.derrotadopor }}</td>
<td><a href="/cambiar_villano"></a>
<router-link class="nav-link" :to="{ name: 'cambiar_villano', params: { id:
index }}"> <button>Editar</button> </router-link>
<button v-on:click="eliminar_villano(index) ">Eliminar</button>
</td>
</tr>
</tbody>
</table>

<a href="/crear_villano"></a>
<router-link class="nav-link" to="/crear_villano"> <button>Agregar Villano</button>
</router-link>
</section>
</div>
`,

        data: function () {
            return {
                villanos: [],
            }
        },
        mounted() {
            let self = this;
            fetch('https://villanos-ven.firebaseio.com/villanos.json')
                .then(r => r.json())
                .then(json => {
                    self.villanos = json;
                });
        },
        methods: { //Inician los Métodos
            eliminar_villano: function (id) {
                let self = this;
                axios.delete('https://villanos-ven.firebaseio.com/villanos/' + id
                    + '.json')
                    .then((response) => {
                        alert("El villano Fue Eliminado");
                        location.reload();
                    }).catch((err) => {
                        self.loading = false; console.log(err);
                    });
            } // fin metodo eliminar_gema
        }
    });
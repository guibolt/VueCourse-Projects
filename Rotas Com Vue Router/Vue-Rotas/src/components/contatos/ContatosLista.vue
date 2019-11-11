<template>
  <div>
    <h3 class="font-weight-light">Contatos</h3>

    <div class="form-group">
      <input
        type="search"
        class="form-control"
        placeholder="Buscar contatos"
        @keyup.enter="buscar"
        :value="busca"
      />
    </div>

    <hr />

    <ul class="list-group" v-if="contatosFiltrados.length > 0">
      <ContatosListaIten
        class="list-group-item"
        v-for="contato in contatosFiltrados"
        :key="contato.id"
        :contato="contato"
      />
    </ul>

    <p v-else>Nenhum contato cadastrado.</p>

    <button class="btn btn-primary mr-2" @click="editar = !editar">Adicionar Novo</button>

    <form v-if="editar" @submit.prevent="salvar">
      <div class="form-group">
        <label>Nome</label>
        <input type="text" class="form-control" placeholder="Insira o nome" v-model="contato.nome" />
      </div>
      <div class="form-group">
        <label>Email</label>
        <input
          type="email"
          class="form-control"
          placeholder="Insira o email"
          v-model="contato.email"
        />
      </div>
      <p>nome {{contato.nome}}</p>
      <p>nome {{contato.email}}</p>

      <button type="button" class="btn btn-secondary mt-4 mb-4 mr-2" @click="$router.back()">Voltar</button>
      <button type="submit" class="btn btn-success">Salvar</button>
    </form>

    <button class="btn btn-secondary mt-4 mb-4" @click="voltar">Voltar</button>
  </div>
</template>

<script>
import ContatosListaIten from "./ContatosListaIten.vue";
import EventBus from "./../../event-bus";

export default {
  components: {
    ContatosListaIten
  },
  props: ["busca"],
  data() {
    return {
      contatos: [],
      editar: false,
      contato: { nome: "", email: "", id: 0 }
    };
  },
  computed: {
    contatosFiltrados() {
      const busca = this.busca;
      return !busca
        ? this.contatos
        : this.contatos.filter(c =>
            c.nome.toLowerCase().includes(busca.toLowerCase())
          );
    }
  },
  created() {
    this.contatos = EventBus.contatos;
  },
  methods: {
    buscar(event) {
      this.$router.push({
        path: "/contatos",
        query: { busca: event.target.value }
      });
    },
    voltar(event) {
      this.$router.back();
    },
    salvar(event) {
      this.contato.id = this.contatos.length + 1;
      EventBus.contatos.push(this.contato);
      this.$router.push("/contatos");
    }
  }
};
</script>


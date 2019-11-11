<template>
  <li>
    <span>{{ contato.nome }}</span>
    <button class="btn btn-danger btn-sm float-right" @click="removeContato(contato.id)">Remover</button>
    <router-link
      :to="{ 
                path: `/contatos/${contato.id}`
            }"
      class="btn btn-info btn-sm mr-2 float-right"
    >Detalhes</router-link>

    <!-- <button
            class="btn btn-info btn-sm float-right"
            @click="verDetalhes">
                Detalhes
    </button>-->
  </li>
</template>

<script>
import EventBus from "./../../event-bus";
export default {
  props: {
    contato: {
      type: Object,
      required: true
    }
  },
  methods: {
    verDetalhes(event) {
      // this.$router.push(`/contatos/${this.contato.id}`)
      // this.$router.push({ path: `/contatos/${this.contato.id}` })
      // this.$router.push({ path: '/contatos', params: { id: this.contato.id } })
      // this.$router.push({ name: 'contato', params: { id: this.contato.id } })
      // this.$router.replace({ name: 'contato', params: { id: this.contato.id } })
    },
    removeContato(id) {
      EventBus.removerContato(id);
    }
  }
};
</script>


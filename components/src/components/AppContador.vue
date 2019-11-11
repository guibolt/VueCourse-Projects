<template>
  <div>
    <h2>Cliado {{ contador}} vezes</h2>
    <input v-model="quantidade" placeholder="Escolha em quanto quer aumentar!" />
    <button @click="incrementar">Incrementar</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      contador: 0,
      quantidade: 0
    };
  },
  methods: {
    incrementar() {
      this.contador += this.quantidade;
    }
  }
};
</script>

<style>
</style>
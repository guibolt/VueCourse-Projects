<template>
  <div id="app" class="container">
    <h1>Dinamicos components</h1>

    <button @click="componentSelecionado = 'Home'">Home</button>
    <button @click="componentSelecionado = 'PostsLista'">Posts</button>
    <button @click="componentSelecionado = 'Sobre'">Sobre</button>

    <component :is="componentSelecionado"></component>
  </div>
</template>

<script>
import PostsLista from "./components/PostsLista";
import Home from "./components/Home";
import Sobre from "./components/Sobre";

export default {
  components: {
    PostsLista,
    Home,
    Sobre
  },
  data() {
    return {
      componentSelecionado: "Home",
      posts: [
        {
          id: 1,
          titulo: "CEntendendo componentes Vue",
          conteudo: "aasdsadasfdffsfsfsafasdffadfadsfsfsfsfsf",
          autor: "Guilherme dos Reis "
        },
        {
          id: 2,
          titulo: "A vida na Agia Vue",
          conteudo: "laaaaaaasllllllllllllllsodaoddllvmvm",
          autor: "Jose dos Reis "
        }
      ]
    };
  }
};
</script>

<style scoped>
.container {
  width: 960px;
  margin: auto;
}
</style>

<!-- <PostsLista :posts="posts" />
    <hr />
    <PostsLista :posts="posts">
      <h2>Vue Components</h2>
      <template v-slot="{ meuPost }">
        <h2>{{meuPost.titulo}}</h2>
        <p>{.meuPost.conteudo}}</p>
        <small>{{meuPost.autor}}</small>
      </template>
    </PostsLista> -->
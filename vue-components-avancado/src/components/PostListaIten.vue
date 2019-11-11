<template>
  <div classs="post">
    <slot>
      <div class="post-cabecalho">
        <h2>{{post.titulo}}</h2>
      </div>

      <div class="post-conteudo">
        <p>{{post.conteudo}}</p>
      </div>
      <div class="post-rodape">
        <small>{{post.autor}}</small>
        <a href="#" class="link">
          <slot name="botao">Ler mais..</slot>
        </a>
      </div>
    </slot>
  </div>
</template>

<script>
export default {
  props: {
    post: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
.post {
  margin: 15px auto;
}
.post-cabecalho {
  padding: 5p 12px;
  background-color: #eee;
}

.post-conteudo {
  font-size: 16px;
}

.post-rodape {
  font-style: italic;
}
.link {
  float: right;
}
.post-paragrafo {
  color: purple;
  font-size: 25px;
}
</style>
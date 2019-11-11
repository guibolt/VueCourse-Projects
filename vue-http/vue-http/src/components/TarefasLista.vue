<template>
  <div>
    <div class="row">
      <div class="col-sm-10">
        <h1 class="font-weight-light">Lista de Tarefas</h1>
      </div>
      <div class="col-sm-2">
        <button class="btn btn-primary float-right" @click="exibirResetado">
          <i class="fa fa-plus mr-2"></i>
          <span>Criar</span>
        </button>
      </div>
    </div>

    <ul class="list-group" v-if="tarefasOrdenadas.length > 0">
      <TarefasListaIten
        v-for="tarefa in tarefasOrdenadas"
        :key="tarefa.id"
        :tarefa="tarefa"
        @editar="selecionarTarefaParaEdicao"
        @deletar="deletarTarefa"
        @concluir="concluirTarefa"
      />
    </ul>

    <p v-else-if="!mensagemErro">Nenhuma tarefa criada.</p>

    <div v-else class="alert alert-danger">{{ mensagemErro}}</div>

    <TarefaSalvar
      v-if="exibirFormulario"
      :tarefa="tarefaSelecionada"
      @criar="criarTarefa"
      @editar="editarTarefa"
    />
  </div>
</template>

<script>
import axios from "./../config/axios";

import config from "./../config/config";
import TarefaSalvar from "./TarefaSalvar.vue";
import TarefasListaIten from "./TarefasListaIten.vue";
import { Promise } from "q";

export default {
  components: {
    TarefaSalvar,
    TarefasListaIten
  },
  data() {
    return {
      tarefas: [],
      exibirFormulario: false,
      tarefaSelecionada: undefined,
      mensagemErro: undefined
    };
  },
  computed: {
    tarefasOrdenadas() {
      return this.tarefas.slice().sort((t1, t2) => {
        if (t1.concluido === t2.concluido) {
          return t1.titulo < t2.titulo ? -1 : t1.titulo > t2.titulo ? 1 : 0;
        }
        return t1.concluido - t2.concluido;
      });
    }
  },
  created() {
    axios
      .get(`/tarefas`)
      .then(
        response => {
          this.tarefas = response.data;
        },
        error => {
          alert(`Erro capturado!${error}`);
          return Promise.reject(error);
        }
      )
      .catch(error => {
        alert(`Erro Captturado no catch ${error}`);
        if (error.response) {
          this.mensagemErro = `Servidos retornou um erro: ${error.message}  ${error.response.statusText}`;
          console.log(`Erro resposta:${error.response}`);
        } else if (error.response) {
          this.mensagemErro = `Erro ao tentar comunicar com o servidor :${error.message}`;
          console.log(`Erro de requisição : ${error.request}`);
        } else
          this.mensagemErro = `Erro ao fazer requsiição ao servidos: ${error.message}`;
      });
  },
  methods: {
    criarTarefa(tarefa) {
      //   axios.post(`$/tarefas`, tarefa)
      //axios.get("",{})
      //axios.post("",{},{})
      //axios.delete("",{})

      axios
        .request({
          method: "post",
          baseURL: config.apiURL,
          url: "/tarefas",
          data: tarefa
        })
        .then(response => {
          alert(`Objeto Enviado! ${response.data}`);
          this.tarefas.push(response.data);
          this.exibirFormulario = false;
        });
    },
    editarTarefa(tarefa) {
      axios.put(`tarefas/${tarefa.id}`, tarefa).then(response => {
        const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
        this.tarefas.splice(indice, 1, tarefa);
        this.resetar();
      });
    },
    async deletarTarefa(tarefa) {
      const confirmar = window.confirm(
        `Deseja deletar a tarefa "${tarefa.titulo}"?`
      );

      if (confirmar) {
        // axios.delete(`tarefas/${tarefa.id}`, tarefa).then(response => {
        //   alert(response);
        //   const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
        //   this.tarefas.splice(indice, 1);
        // });

        try {
          const response = await axios.delete(`tarefas/${tarefa.id}`, tarefa);
          const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
          this.tarefas.splice(indice, 1);
        } catch (e) {
          console.log("Erro ao deletar Tarefa:", e);
        }
      }
    },
    concluirTarefa(tarefa) {
      let aTarefa = this.tarefas.find(c => c.id === tarefa.id);
      aTarefa.concluido = aTarefa.concluido ? false : true;
      axios.put(`/tarefas/${tarefa.id}`, aTarefa).then(response => {
        const indice = this.tarefas.findIndex(t => t.id === tarefa.id);
        this.tarefas.splice(indice, 1, aTarefa);
      });
    },
    resetar() {
      this.tarefaSelecionada = undefined;
      this.exibirFormulario = false;
    },
    selecionarTarefaParaEdicao(tarefa) {
      this.tarefaSelecionada = tarefa;
      this.exibirFormulario = true;
    },
    exibirResetado() {
      this.exibirFormulario = !this.exibirFormulario;
      this.tarefaSelecionada = undefined;
    }
  }
};
</script>

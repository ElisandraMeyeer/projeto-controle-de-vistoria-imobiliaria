<template>
<div class="container">
    <div class="py-5 text-center">
        <h2>Controle de vistorias</h2>
    </div>

    <div class="mb-3 shadow-sm p-3 bg-body-tertiary rounded">
        <div class="pb-2">
            <h5>Dados do imóvel</h5>
        </div>
        <div class="pb-4">
            <label for="formGroupExampleInput2" class="form-label mx-2">Tipo imóvel: </label>
            <Dropdown v-model="dados.imovel" :options="tipoImovel" option-label="nome" filter showClear @blur="salva(dados.imovel, 'imovel')" placeholder="Selecione tipo de imóvel" class="w-full inline" />
        </div>

        <div class="mb-3">
            <label class="form-label">Nome da vistoria:</label>
            <input type="text" class="form-control" v-model="dados.nome">
        </div>

        <div class="mb-3">
            <label for="exampleFormControlInput1" class="form-label">Endereço do imóvel</label>
            <div class="row">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Rua" @blur="salva(dados.rua, 'rua')" v-model="dados.rua">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Número" @blur="salva(dados.numero, 'numero')" v-model="dados.numero">
                </div>
                <div class="col" v-show="apartamento">
                    <input type="text" class="form-control" placeholder="Bloco - N° Apto" @blur="salva(dados.apto, 'apto')" v-model="dados.apto">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Bairro" @blur="salva(dados.bairro, 'bairro')" v-model="dados.bairro">
                </div>

            </div>
            <div class="row mt-2">
                <div class="col">
                    <input type="text" class="form-control" placeholder="Cidade" v-model="dados.cidade">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="Estado" v-model="dados.estado">
                </div>
                <div class="col">
                    <input type="text" class="form-control" placeholder="CEP" v-model="dados.cep">
                </div>
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label ">Data da vistoria</label>
            <div>
                <!-- traduzir -->
                <Calendar v-model="dados.data" class="ml-2" dateFormat="dd/mm/yy" />
            </div>
        </div>
        <div class="mb-3">
            <label class="form-label">Nome do Locatário:</label>
            <input type="text" class="form-control" v-model="dados.locatario">
        </div>
        <div class="mb-3">
            <label class="form-label">CPF do Locatário:</label>
            <input type="text" class="form-control" v-model="dados.cpfLocatario">
        </div>
    </div>

    <div class="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div class="pb-3">
            <h5>Medidores</h5>
        </div>
        <div class="pb-4 input-group">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="inputPassword6" class="col-form-label">Leitura água: </label>
                </div>
                <div class="col-auto">
                    <input type="text" class="form-control" v-model="dados.leituraAgua">
                </div>
            </div>

            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="inputPassword6" class="col-form-label">Situação água: </label>
                </div>
                <div class="col-auto">
                    <Dropdown v-model="dados.situacaoAgua" :options="situacao" showClear placeholder="Selecione" class="w-full inline" />
                </div>
            </div>
        </div>

        <div class="pb-4 input-group">
            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="inputPassword6" class="col-form-label">Leitura energia: </label>
                </div>
                <div class="col-auto">
                    <input type="text" v-model="dados.leituraEnergia" class="form-control">
                </div>
            </div>

            <div class="row g-3 align-items-center">
                <div class="col-auto">
                    <label for="inputPassword6" class="col-form-label">Situação energia: </label>
                </div>
                <div class="col-auto">
                    <Dropdown v-model="dados.situacaoEnergia" :options="situacao" showClear placeholder="Selecione" class="w-full inline" />
                </div>
            </div>
        </div>
    </div>

    <div class="shadow-sm p-3 mb-5 bg-body-tertiary rounded">
        <div class="pb-3">
            <h5>Gerais</h5>
        </div>
        <div class="mb-3">
            <label class="form-label">Faxina: </label>
            <input type="text" class="form-control" v-model="dados.faxina">
        </div>
        <div class="mb-3">
            <label class="form-label">Entulhos: </label>
            <input type="text" class="form-control" v-model="dados.entulhos">
        </div>
        <div class="mb-3">
            <label class="form-label">Pintura: </label>
            <input type="text" class="form-control" v-model="dados.pintura">
        </div>
        <div class="mb-3">
            <label class="form-label">Outras observações gerais: </label>
            <input type="text" class="form-control" v-model="dados.observaçõesGerais">
        </div>
    </div>

    <div class="shadow-sm p-3 mb-5 mt-3 bg-body-tertiary rounded">
        <div class="pb-3">
            <h5>Cômodos:</h5>
        </div>
        <Listbox v-model="comodo" :options="dados.listaComodos" optionLabel="tipo.nome" emptyMessage="Nenhum cômodo adicionado" class="mb-4" />
        <Button label="Adicionar cômodo" icon="pi pi-plus" style="background-color: var(--surface-500); border: black;" @click="visible = true" />
        <ModalAdicionarComodo v-model:visible="visible" @close="visible = false" @adicionar-comodo="adicionarComodo" />
    </div>

    <!-- <button class="w-100 btn btn-secondary btn-lg" style="margin-top: 6rem;" @click="teste()" type="submit">Continue
        to checkout</button> -->

    <router-link class="w-100 btn btn-secondary btn-lg" style="margin-top: 6rem;" :to="{ name: 'relatorio', params: { dados: encodeURIComponent(JSON.stringify(this.dados)) }}">Gerar documento de vistoria</router-link>
    <button @click="limpar()">Limpar formulário</button>
    <button @click="salvar()">Salvar formulário</button>
    <footer class="my-5 pt-5 text-body-secondary text-center text-small">
        <p class="mb-1">&copy; 2023 Elisandra Meyer</p>
    </footer>
</div>
</template>

<script>
import Relatorio from './Relatorio.vue';
import Accordion from 'primevue/accordion';
import AccordionTab from 'primevue/accordiontab';
import Calendar from 'primevue/calendar';
import Dialog from 'primevue/dialog';
import Button from 'primevue/button';
import Dropdown from 'primevue/dropdown';
import InputNumber from 'primevue/inputnumber';
import Listbox from 'primevue/listbox';
import ModalAdicionarComodo from './ModalAdicionarComodo.vue';
import {
    collection,
    addDoc
} from "firebase/firestore";
import {
    db
} from '@/firebase/index.js'

export default {
    components: {
        Relatorio,
        Accordion,
        AccordionTab,
        Calendar,
        Dialog,
        Button,
        Dropdown,
        InputNumber,
        Listbox,
        ModalAdicionarComodo
    },
    props: ['teste'],
    data() {
        return {
            count: 0,
            teste_: false,
            dados: {
                imovel: null,
                rua: null,
                numero: null,
                apto: null,
                bairro: null,
                cidade: null,
                estado: null,
                cep: null,
                data: new Date(),
                locatario: null,
                cpfLocatario: null,
                anotacoes: null,
                leituraAgua: null,
                situacaoAgua: null,
                leituraEnergia: null,
                situacaoEnergia: null,
                faxina: null,
                entulhos: null,
                pintura: null,
                observaçõesGerais: null,
                nome: null
            },
            visible: false,
            tipoImovel: [{
                    nome: 'Apartamento'
                },
                {
                    nome: 'Bangalô'
                },
                {
                    nome: 'Casa'
                },
                {
                    nome: 'Casa de Campo'
                },
                {
                    nome: 'Casa de Praia'
                },
                {
                    nome: 'Chácara'
                },
                {
                    nome: 'Cobertura'
                },
                {
                    nome: 'Duplex'
                },
                {
                    nome: 'Estúdio'
                },
                {
                    nome: 'Fazenda'
                },
                {
                    nome: 'Flat'
                },
                {
                    nome: 'Galpão'
                },
                {
                    nome: 'Kitinete'
                },
                {
                    nome: 'Loteamento'
                },
                {
                    nome: 'Loft'
                },
                {
                    nome: 'Penthouse'
                },
                {
                    nome: 'Sala comercial'
                },
                {
                    nome: 'Terreno'
                },
                {
                    nome: 'Triplex'
                }
            ],
            situacao: [
                'Ligada',
                'Desligada',
                'Cortada'
            ],
            listaComodos: [],
            tipo: null,
            comodo: null
        };
    },
    methods: {
        // teste() {
        //     let teste = this.dados;
        //     this.$router.push({
        //         name: 'relatorio',
        //         params: {
        //             dados: this.dados
        //         }
        //     })
        // },
        adicionarComodo(comodo) {
            this.listaComodos.push(comodo);
            this.dados.listaComodos = this.listaComodos;
            this.salva(this.listaComodos, "comodos")
            console.log(this.listaComodos);
        },
        salva(dado, campo) {
            const tipoDado = typeof dado;
            if (tipoDado == "object") {
                localStorage.setItem(campo, JSON.stringify(dado))
                return;
            }
            if (dado) {
                localStorage.setItem(campo, dado)
            }
        },
        async salvar() {
            try {
                const docRef = await addDoc(collection(db, "vistorias"), {
                    anotacoes: this.dados.anotacoes,
                    apto: this.dados.apto,
                    bairro: this.dados.bairro,
                    estado: this.dados.estado,
                    cep: this.dados.cep,
                    cidade: this.dados.cidade,
                    cpfLocatario: this.dados.cpfLocatario,
                    data: this.dados.data,
                    entulhos: this.dados.entulhos,
                    comodos: this.dados.listaComodos,
                    faxina: this.dados.faxina,
                    imovel: this.dados.imovel,
                    leituraAgua: this.dados.leituraAgua,
                    leituraEnergia: this.dados.leituraEnergia,
                    locatario: this.dados.locatario,
                    nome: this.dados.nome,
                    numero: this.dados.numero,
                    observaçõesGerais: this.dados.observaçõesGerais,
                    pintura: this.dados.pintura,
                    rua: this.dados.rua,
                    situacaoAgua: this.dados.situacaoAgua,
                    situacaoEnergia: this.dados.situacaoEnergia,
                });
                console.log("Document written with ID: ", docRef.id);
            } catch (e) {
                console.error("Error adding document: ", e);
            }

        },
        limpar() {
            localStorage.clear();
            this.dados = {};
        }
    },
    computed: {
        apartamento() {
            if (this.dados.imovel) {
                return this.dados.imovel.nome == "Apartamento";
            }
        }
    },
    mounted() {
        // this.dados.imovel = JSON.parse(localStorage.getItem("imovel"))
        // this.dados.rua = localStorage.getItem("rua")
        // this.dados.numero = localStorage.getItem("numero")
        // this.dados.apto = localStorage.getItem("apto")
        // this.dados.bairro = localStorage.getItem("bairro")
        // this.dados.listaComodos = JSON.parse(localStorage.getItem("comodos"))
        console.log(this.teste);
        if (this.teste) {
            // Converta a string JSON de volta para uma array
            this.teste = JSON.parse(this.teste);
        }

    },
    watch: {
        teste(newTeste) {
            // Faça algo quando this.teste é alterado
            console.log('this.teste foi alterado:', newTeste);
        },
    },
}
</script>

<style scoped></style>

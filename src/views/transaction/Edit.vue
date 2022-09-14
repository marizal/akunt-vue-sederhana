<template>
  <div class="container my-5">
    <div class="row justify-content-beetween">
      <div class="col-md-10">
        <h3>Transaction</h3>
      </div>
      <div class="col-md-2">
        <router-link :to="{ name: 'transaction.index' }"><button class="btn btn-primary">Back</button> </router-link>
      </div>
    </div>
    <div class="row">
      <div class="card rounded shadow">
        <div class="card-header text-center"><h3>Transaction Edit</h3></div>
        <div class="card-body">
          <form @submit.prevent="update()">
            <div class="mb-3">
              <labe class="form-label">Title</labe>
              <input type="text" class="form-control" v-model="transaction.title" placeholder="" />
              <div class="text-danger" v-if="validation.title">{{ validation.title[0] }}</div>
            </div>
            <div class="mb-3">
              <labe class="form-label">Amount</labe>
              <input type="number" class="form-control" v-model="transaction.amount" placeholder="" />
              <div v-if="validation.amount" class="text-danger">{{ validation.amount[1] }}</div>
            </div>
            <div class="mb-3">
              <labe class="form-label">Time</labe>
              <input type="text" class="form-control" placeholder="yyyy-mm-dd hh:mm:ss" v-model="transaction.time" />
              <div v-if="validation.time" class="text-danger">{{ validation.time[1] }}</div>
            </div>
            <div class="mb-3">
              <labe class="form-label">Type</labe>
              <select class="form-select" v-model="transaction.type" placeholder="" aria-label="Default select example">
                <option value="expense">Expense</option>
                <option value="revenue">Revenue</option>
              </select>
              <div v-if="validation.type" class="text-danger">{{ validation.type[1] }}</div>
            </div>
            <button class="btn btn-outline-primary">Submit</button>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { reactive, ref, onMounted } from "vue";
import { useRouter, useRoute } from "vue-router";
import axios from "axios";
export default {
  setup() {
    //data binding
    const transaction = reactive({
      title: "",
      amount: "",
      time: "",
      type: "",
    });

    const validation = ref([]);
    // menampung router
    const router = useRouter();
    // untuk mendapatkan data yang ada diparamater url
    const route = useRoute();

    onMounted(() => {
      axios
        .get(`http://127.0.0.1:8000/api/transaction/${route.params.id}`)
        .then((result) => {
          transaction.title = result.data.data.title;
          transaction.amount = result.data.data.amount;
          transaction.time = result.data.data.time;
          transaction.type = result.data.data.type;
        })
        .catch((err) => {});
    });

    function update() {
      axios.patch(`http://127.0.0.1:8000/api/transaction/${route.params.id}`, transaction).then(() => {
        router
          .push({
            name: "transaction.index",
          })
          .catch((err) => {
            validation.value = err.response.data;
          });
      });
    }
    return {
      transaction,
      validation,
      router,
      update,
    };
  },
};
</script>

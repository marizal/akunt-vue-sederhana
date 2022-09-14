<template>
  <div class="container my-5">
    <div class="row">
      <div class="col-md-10">
        <h3>Index</h3>
      </div>
      <div class="col-md-2">
        <router-link :to="{ name: 'transaction.create' }" class="btn btn-primary">Tambah Transaksi </router-link>
      </div>
    </div>
    <div class="row">
      <div class="card rounded shadow">
        <div class="card-header text-center"><h3>Transaction List</h3></div>
        <div class="card-body">
          <table class="table">
            <thead>
              <tr>
                <th scope="col">Title</th>
                <th scope="col">Amount</th>
                <th scope="col">Type</th>
                <th scope="col">Action</th>
              </tr>
            </thead>
            <tbody>
              <!-- v-for perulangan vue untuk mengambil data dari transaction -->
              <tr v-for="(transaction, index) in transactions.data" :key="index">
                <td>{{ transaction.title }}</td>
                <td>{{ transaction.amount }}</td>
                <td>{{ transaction.type }}</td>
                <td>
                  <div class="form-group">
                    <router-link :to="{ name: 'transaction.edit', params: { id: transaction.id } }" class="btn btn-info">Edit </router-link>
                    <div class="btn btn-danger" @click.prevent="destroy(transaction.id, index)">Delete</div>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
import { onMounted, ref } from "vue";

export default {
  // memanggil fungsi setup
  setup() {
    // transaction wadah menampung data yang akan kita panggil dari api menggunakan ref dan isinya array kosong dahulu
    // reactive state ->
    let transactions = ref([]);
    onMounted(() => {
      axios
        .get("http://localhost:8000/api/transaction")
        .then((result) => {
          transactions.value = result.data;
        })
        .catch((err) => {
          console.log(err.response);
        });

      // .get("http://localhost:8000/api/transaction")
      // .then((result) => {
      //   //jika sukses
      //   transactions.value = result.data;
      // })
      // .catch((err) => {
      //   //jika gagal
      //   console.log(err.response);
      // });
    });

    function destroy(id, index) {
      axios
        .delete(`http://127.0.0.1:8000/api/transaction/${id}`)
        .then(() => {
          transactions.value.data.splice(index, 1);
        })
        .catch((err) => {
          console.log(err.response.data);
        });
    }

    return {
      transactions,
      destroy,
    };
    // mengambil data dari api enpoint
  },
};
</script>

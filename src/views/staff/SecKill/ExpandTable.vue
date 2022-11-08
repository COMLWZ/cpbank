<template>
  <el-table ref="productListTableRef" :data="tableData" :header-row-style="{color: '#3e3e3e'}"
            :row-style="{background: 'transparent'}" @expand-change="productListExpandChangeHandle"
            :row-key="(row)=>row.id" :expand-row-keys="expandedRows" height="440px"
            @row-click="productListRowClickHandle" style="background: transparent">
    <el-table-column v-if="expand" type="expand">
      <template #default="scope">
        <slot name="expand" :row="scope.row"></slot>
      </template>
    </el-table-column>
    <el-table-column v-for="(column, i) in tableColumn" :key="i" :label="column.label"
                     :prop="column.prop" min-width="100px">
      <template v-if="column.slot" #default="scope">
        <slot :name="column.slot" :row="scope.row"></slot>
      </template>
    </el-table-column>
  </el-table>
</template>

<script lang="ts">
const { ref } = require('vue')

export default {
  name: 'ExpandTable',
  props: {
    tableData: {
      type: Array,
      required: true
    },
    tableColumn: {
      type: Object,
      required: true
    },
    expand: {
      type: Boolean,
      default: true
    }
  },
  setup () {
    const productListTableRef = ref(null)
    const expandedRows = ref([])
    // 展开变化
    const productListExpandChangeHandle = (row: any, expands: any) => {
      if (expandedRows.length > 1) {
        expandedRows.value.length = 0
      }
      if (expands.length <= 0) {
        expandedRows.value.length = 0
      } else {
        expandedRows.value = [row.id]
      }
    }
    // 点击row
    const productListRowClickHandle = (row: any) => {
      if (row.id === expandedRows.value[0]) {
        expandedRows.value.length = 0
      } else {
        productListTableRef.value.toggleRowExpansion(row, true)
      }
    }

    return {
      productListTableRef,
      expandedRows,
      productListExpandChangeHandle,
      productListRowClickHandle
    }
  }
}
</script>

<style scoped>

</style>

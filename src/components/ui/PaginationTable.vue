 <template>
  <nav aria-label="Page navigation example">
    <ul ref="peep" class="pagination justify-content-center pagination-lg">
      <a class="page-link" :class="{ disabled: isDisabled}" href="#"
         aria-label="Previous"
         @click="backButtonClick(pagesNumber[0]-3)">
        <span aria-hidden="true">&laquo;</span>
      </a>
      <li class="page-item"><a class='page-link ' :class="{active: activeList[0].value}"
                               @click="nextButtonClick(pagesNumber[0],0); toggleClass(0);">{{
          pagesNumber[0]
        }} </a>
      </li>
      <li class="page-item"><a class='page-link' :class="{active: activeList[1].value}"
                               @click=" nextButtonClick(pagesNumber[1],1); toggleClass(1);">{{
          pagesNumber[1]
        }} </a>
      </li>
      <li class="page-item"><a class='page-link' :class="{active: activeList[2].value}"
                               @click="nextButtonClick(pagesNumber[2],2); toggleClass(2);">{{
          pagesNumber[2]
        }} </a>
      </li>
      <a class="page-link" href="#" aria-label="Next" @click="nextButtonClick(1+pagesNumber[2])">
        <span aria-hidden="true">&raquo;</span>
      </a>
    </ul>
  </nav>
</template>
<script setup lang="ts">

import {ref} from "vue";

let pagesNumber: Number[] = [0, 1, 2];
let isActive0, isActive1, isActive2;
const isDisabled = ref(true)
const emit = defineEmits<{
  (e: 'pageNumberEmit', page: Number)
}>()

const activeList: Dictionary<boolean> = {
  0: isActive0 = ref(true),
  1: isActive1 = ref(false),
  2: isActive2 = ref(false),
};

function toggleClass(pageClickedToToggle): void {
  for (const key in activeList) {
    if (activeList[key].value == true)
      var indexOfTrue = key;
  }
  activeList[indexOfTrue].value = !activeList[indexOfTrue].value
  activeList[pageClickedToToggle].value = !activeList[pageClickedToToggle].value
}

function backButtonClick(page: Number): void {
  if (page < 0) {
    isDisabled.value = true
  } else {
    for (const key in activeList) {
      if (activeList[key].value == true)
        var indexOfTrue = key;
    }
    activeList[indexOfTrue].value = false;
    activeList[0].value = true;
    pagesNumber[2] = pagesNumber[0] - 1;
    pagesNumber[1] = pagesNumber[2] - 1;
    pagesNumber[0] = pagesNumber[1] - 1;
    pageNumber.value--;
    if (pagesNumber[0] == 0) {
      isDisabled.value = true;
    }
  }
  emit('pageNumberEmit', page)
}

function nextButtonClick(page: Number, clickedPage: Number): void {
  for (const key in activeList) {
    if (activeList[key].value == true)
      var indexOfTrue = key;
  }
  if (indexOfTrue != clickedPage) {
    isDisabled.value = page <= 0;
    if (page > pagesNumber[2]) {
      pagesNumber[0] = pagesNumber[2] + 1;
      pagesNumber[1] = pagesNumber[0] + 1;
      pagesNumber[2] = pagesNumber[0] + 2;
      pageNumber.value++;
    }
    activeList[indexOfTrue].value = false
    activeList[0].value = true
    emit('pageNumberEmit', page)
  }
}


</script>
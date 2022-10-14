<template>
  <div>
    <v-expansion-panels inset>
      <v-expansion-panel v-for="job in jobsList" :key="job._id" @click="showJobDetails(job._id)">
        <v-expansion-panel-header>{{"Job Id : "+job.uuid}}</v-expansion-panel-header>
        <v-expansion-panel-content>
          <!-- <v-timeline dense>
            <v-slide-x-reverse-transition group hide-on-leave>
              <v-timeline-item v-for="item in selectedJobInfo.changelog" :key="item.id" :color="item.color" small
                fill-dot>
                <v-alert :value="true" :color="item.color" :icon="item.icon" class="white--text">
                  {{ item.text }}
                  <v-spacer></v-spacer>
                  {{ item.date }}
                </v-alert>
              </v-timeline-item>
            </v-slide-x-reverse-transition>
          </v-timeline> -->
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-overlay :value="showOverlayLoader">
      <v-progress-circular indeterminate color="#5243AA" size="64"></v-progress-circular>
    </v-overlay>
  </div>
</template>

<script>
import { mapActions,mapGetters } from "vuex";

const statusHashMap = {
  IN_QUEUE: { icon: "mdi-cloud-check", color: "info", text: "Job In Queue" },
  ASSERTING_JOB: { icon: "mdi-cloud-check", color: "info", text: "Job In Queue" },
  PROCESSING_FILES: { icon: "mdi-progress-clock", color: "info", text: "Processing Job" },
  ERROR: { icon: "mdi-alert-circle", color: "error", text: "Process Errored" },
  SUCCESS: { icon: "mdi-check-bold", color: "success", text: "Job completed successfully" },
}

export default {
  name: "jobs",
  data() {
    return {
      selectedJobInfo: null,
      jobsList: []
    }
  },
  async created() {
    this.getData();
  },
  computed:{
    ...mapGetters(["showOverlayLoader"])
  },
  methods: {
    ...mapActions("jobs", ["getJobsList", "getJobDetails"]),
    getData() {
      this.getJobsList({
        pageSize: this.pageSize,
        pageNo: this.pageNo,
      }).then((data) => {
        this.jobsList = data.list
        console.log(data)
        this.totalCount = data.totalCount;
        this.fetchCount = data.fetchCount;
        console.log(this.jobsList)
      });
    },
    showJobDetails(selectedEntry) {
      this.getJobDetails({
        _id: selectedEntry._id,
      }).then((data) => {
        this.selectedJobInfo = {
          jobInfo: selectedEntry,
          changelog: data.jobDetails.map((e, index) => {
            if (statusHashMap[e.status])
              return {
                id: index,
                status: e.status,
                ...statusHashMap[e.status],
                date: this.getFormattedDate(e.createdOn, "DD/MM/YYYY - hh:mm:ss A UTC"),
              };
            else
              return {
                id: index,
                status: e.status,
                icon: "mdi-information",
                color: "info",
                text: e.status,
                date: this.getFormattedDate(e.createdOn, "DD/MM/YYYY - hh:mm:ss A UTC"),
              };
          }),
        };
      });
      console.log(this.selectedJobInfo);
    }
  },
}

</script>
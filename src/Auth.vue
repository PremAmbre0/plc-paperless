<template>
  <v-app>
    <div class="authWrapper">
      <div class="logo-wrapper"></div>
      <div class="auth-input-wrapper">
        <div class="form-title">PLC Webapp {{ version }}</div>
        <div class="auth-form">
          <button class="form-action" @click="loginUser">
            Login with Auth0
          </button>
        </div>
      </div>

      <v-overlay :value="loaderDialog" :z-index="100">
        <v-progress-circular
          color="primary"
          indeterminate
          size="64"
        ></v-progress-circular>
      </v-overlay>

      <v-snackbar
        v-model="localSnackbarState"
        multi-line
        light
        top
        right
        :timeout="snackbarTime"
      >
        <div class="snackbarComponentWrapper">
          <div class="content">{{ snackbarText }}</div>
          <div class="action-button">
            <v-btn small fab color="accent" text @click.stop="closeSnackbar">
              <v-icon>mdi-close</v-icon>
            </v-btn>
          </div>
        </div>
      </v-snackbar>

      <!-- <v-dialog v-model="showOtpDialog" persistent max-width="500" width="500">
				<v-card>
					<v-card-title class="text-h5 grey lighten-2"> Enter Verification Code Sent on email </v-card-title>

					<v-card-text>
						<v-container class="white lighten-2" fluid>
							<v-otp-input type="number" v-model="otp" :length="length" dark></v-otp-input>
						</v-container>
						<v-btn block :disabled="!isActive" @click="sendOtpForVerification">Verify</v-btn>
						<v-btn block @click="showOtpDialog = false">Cancel</v-btn>
					</v-card-text>

					<v-card-actions> </v-card-actions>
				</v-card>
			</v-dialog> -->
    </div>
  </v-app>
</template>

<script>
import { required, email } from "vuelidate/lib/validators";
import { mapActions, mapMutations, mapGetters } from "vuex";
import packageJson from "../package.json";
export default {
  name: "Auth",
  components: {},
  created() {},
  mounted() {},
  data: () => ({
    showError: false,
    localSnackbarState: false,
    errorText: false,
    email: "",
    password: "",
    loaderDialog: false,
    showOtpDialog: false,
    version: packageJson.version,
    otp: "",
    length: 6,
  }),
  methods: {
    ...mapActions([]),
    ...mapMutations(["openSnackbar", "closeSnackbar"]),
    /*
     * validates the input when the login button is pressed and intiates login for the user.
     * if successful then emits startSession
     * else provides appropriate error
     */
    async loginUser() {
      this.$auth.loginWithRedirect();
    },
  },
  computed: {
    ...mapGetters(["snackbarState", "snackbarText", "snackbarTime"]),
    isActive() {
      return this.otp.length === this.length;
    },
  },
  watch: {
    snackbarState(nv) {
      this.localSnackbarState = nv;
    },
    localSnackbarState(nv) {
      if (!nv) {
        this.closeSnackbar();
      }
    },
  },
  validations: {
    email: {
      required,
      email,
    },
    password: {
      required,
    },
  },
};
</script>

<style lang="scss" scoped>
.action-button {
  display: flex;
  flex-direction: row;
}
.authWrapper {
  // background-color: $primary;
  background: #f5f2e7;
  height: 100vh;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  .logo-wrapper {
    width: 340px;
    height: auto;
    margin-bottom: 20px;
    img {
      height: 100%;
      width: 100%;
    }
  }

  .auth-page-title {
    color: white;
    padding-top: 120px;
    font-size: 36px;
    font-weight: bold;
    margin-bottom: 30px;
    text-align: center;
  }

  .auth-input-wrapper {
    background: #ffffff;
    box-shadow: 0px 2px 10px #0000001a;
    border-radius: 10px;
    opacity: 1;
    width: 336px;

    .form-title {
      padding-top: 24px;
      margin-bottom: 30px;
      font-size: 30px;
      text-align: center;
      color: #440381;
      opacity: 1;
    }

    .auth-form {
      padding: 0 18px;

      .form-input {
        height: 38px;
        width: 100%;
        background: #f7f7f7 0% 0% no-repeat padding-box;
        border-radius: 5px;
        opacity: 1;
        margin-bottom: 16px;
        padding-left: 10px;

        &::placeholder {
          padding: 10px;
        }

        &:focus {
          outline: none;
        }
      }

      .error-container {
        margin-top: 8px;
        margin-bottom: 16px;
        width: 300px;
        background: #ff5d5d1a 0% 0% no-repeat padding-box;
        border-radius: 5px;
        color: #940000;
        padding: 10px 37px;
      }

      text-align: center;

      .form-action {
        color: white;
        margin-top: 20px;
        margin-bottom: 24px;
        background: #440381 0% 0% no-repeat padding-box;
        box-shadow: 0px 3px 6px #2b426633;
        border-radius: 21px;
        opacity: 1;
        padding: 12px 40px;

        &:focus {
          outline: none;
        }
      }
    }
  }
}
</style>

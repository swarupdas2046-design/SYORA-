class ApiResponse {
  constructor(message, data = null) {
    this.status = true;
    this.message = message;
    this.data = data;
  }
}

export default ApiResponse;

class CustomErrors extends Error {
  status: number;

  constructor(status: number, message: string) {
    super(message);

    this.status = status;
  }
}

// export const errorTypes = {
//   InvalidMongoId: {
//     status: 400,
//     message: 'invalid mongo id',
//   },
// };

export default CustomErrors;

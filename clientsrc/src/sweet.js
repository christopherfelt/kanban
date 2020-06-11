import Swal from "sweetalert2";

export default class NotificationService {
  // Swal.fire({
  //   title: 'Are you sure?',
  //   text: "You won't be able to revert this!",
  //   icon: 'warning',
  //   showCancelButton: true,
  //   confirmButtonColor: '#3085d6',
  //   cancelButtonColor: '#d33',
  //   confirmButtonText: 'Yes, delete it!'
  // }).then((result) => {
  //   if (result.value) {
  //     Swal.fire(
  //       'Deleted!',
  //       'Your file has been deleted.',
  //       'success'
  //     )
  //   }
  // })

  static async confirmAction(
    title = "Are you sure?",
    text = "This action cannot be undone"
  ) {
    try {
      let res = await Swal.fire({
        title: title,
        text: text,
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Yes, delete it!",
      });
      if (res.value) {
        return true;
      }
      return false;
    } catch (error) {
      console.error(error);
    }
  }

  //   static toast(title = "default handler", icon = "success") {
  //       Swal.fire({
  //           icon:icon,
  //           title: title,

  //     })
  //   }
}

const { $swal } = useNuxtApp();

export function useSuccessToast(title: string) {
  $swal.fire({
    icon: "success",
    title,
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
}

export function useErrorToast(title: string) {
  $swal.fire({
    icon: "error",
    title,
    timer: 1500,
    showConfirmButton: false,
    toast: true,
    position: "top-end",
  });
}

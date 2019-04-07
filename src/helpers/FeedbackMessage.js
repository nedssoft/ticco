import swal from 'sweetalert'

export const successFeedback = (message) => {
  swal('', message, 'success')
}

export const errorFeedback = (message) => {
  swal('', message, 'error')
}


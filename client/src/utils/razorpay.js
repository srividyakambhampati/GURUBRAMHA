import axios from 'axios';

export const loadRazorpay = () => {
  return new Promise((resolve) => {
    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
};

export const handlePayment = async ({ amount, currency = 'INR', description, user, onSuccess }) => {
  try {
    const { data: order } = await axios.post('http://localhost:5000/api/payment/order', {
      amount,
      currency,
      receipt: `receipt_${Date.now()}`
    });

    const options = {
      key: 'rzp_test_Sp9CaxwkHr5Jyn', // Test Key
      amount: order.amount,
      currency: order.currency,
      name: 'GuruBramha Academy',
      description: description || 'Course Enrollment',
      image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?w=100',
      order_id: order.id,
      handler: async (response) => {
        try {
          const verifyRes = await axios.post('http://localhost:5000/api/payment/verify', response);
          if (verifyRes.data.message === "Payment verified successfully") {
            alert('✅ Payment Successful! Welcome to GuruBramha Academy.');
            if (onSuccess) {
                onSuccess();
            } else {
                window.location.href = '/dashboard';
            }
          }
        } catch (error) {
          console.error('Verification Error:', error);
          alert('❌ Payment Verification Failed.');
        }
      },
      prefill: {
        name: user?.displayName || 'Scholar',
        email: user?.email || 'scholar@gurubramha.edu',
        contact: '9876543210'
      },
      notes: {
        address: 'GuruBramha Corporate Office'
      },
      theme: {
        color: '#4F8CFF'
      },
      modal: {
        ondismiss: function() {
            console.log('Checkout modal closed');
        }
      }
    };

    const rzp = new window.Razorpay(options);
    rzp.open();
  } catch (error) {
    console.error('Payment Error:', error);
    alert('❌ Error initializing payment. Please try again.');
  }
};

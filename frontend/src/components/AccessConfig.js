export const AccessConfig = () => {
    const access = localStorage.getItem('access');

    const config = {
      headers: {
        'Content-type': 'application/json',
        Authorization: `Bearer ${access}`,
      },
    };
    return config;
  };
  
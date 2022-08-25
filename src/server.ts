import api from './api';
import 'dotenv/config';

const PORT = process.env.PORT || 3001;

api.listen(PORT, () => {
  // eslint-disable-next-line no-console
  console.log(`Running on port ${PORT}`);
});

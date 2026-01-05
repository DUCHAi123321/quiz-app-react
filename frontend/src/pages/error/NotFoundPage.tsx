import ErrorPage from './ErrorPage';
import { ERROR_MESSAGES } from '@/constants';

const NotFoundPage = () => {
  const { title, message, buttonText } = ERROR_MESSAGES[404];

  return (
    <ErrorPage
      errorCode="404"
      title={title}
      message={message}
      buttonText={buttonText}
    />
  );
};

export default NotFoundPage;

import ErrorPage from './ErrorPage';
import { ERROR_MESSAGES } from '@/constants';

const ForbiddenPage = () => {
  const { title, message, buttonText } = ERROR_MESSAGES[403];

  return (
    <ErrorPage
      errorCode="403"
      title={title}
      message={message}
      buttonText={buttonText}
    />
  );
};

export default ForbiddenPage;

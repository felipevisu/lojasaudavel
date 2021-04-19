import { ErrorPage } from '../components/common/errorPage'

function Error({ statusCode, hasGetInitialPropsRun, err }) {

  return (
    <p>
      {statusCode
        ? <p>Ocorreu um erro ${statusCode} no servidor</p>
        : <ErrorPage />
      }
    </p>
  )
}

Error.getInitialProps = async ({ res, err, asPath }) => {
  const errorInitialProps = await NextErrorComponent.getInitialProps({res, err});
  errorInitialProps.hasGetInitialPropsRun = true;

  if (res?.statusCode === 404) {
    return { statusCode: 404 };
  }
  if (err) {
    return errorInitialProps;
  }

  return errorInitialProps;
}

export default Error
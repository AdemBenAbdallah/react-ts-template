import { rem, Stack, Text, Title } from '@mantine/core';
import { MainAuthForm } from './MainAuthForm';

class UnauthorizedError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'UnauthorizedError';
    this.statusCode = 403;
  }
}

class NotFoundError extends Error {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.name = 'NotFoundError';
    this.statusCode = 404;
  }
}

export const ErrorComponent = ({ statusCode, title }: { statusCode: number; title: string }) => {
  return (
    <Stack align="center" w={'100%'} h={'100vh'}>
      <Stack align="center" p={rem(80)}>
        <Title>{statusCode} ❌</Title>
        <Text>{title} 😔</Text>
      </Stack>
    </Stack>
  );
};

export function RootErrorFallback({ error }: { error: Error }) {
  if (error instanceof UnauthorizedError) {
    return <MainAuthForm />;
  } else if (error instanceof NotFoundError) {
    return (
      <ErrorComponent
        statusCode={error.statusCode}
        title="Sorry, the requested resource was not found."
      />
    );
  } else {
    return (
      <ErrorComponent
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        statusCode={(error as any)?.statusCode || 400}
        title={error.message || error.name}
      />
    );
  }
}

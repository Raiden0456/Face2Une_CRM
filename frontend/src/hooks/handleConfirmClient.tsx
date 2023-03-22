import { ClientService, NewClient } from '../service/ClientService';

export interface IConfirmClient {
  email: string;
  clientInfo: NewClient;
  fallback?: string;
}

export const handleConfirmClient = async ({ email, clientInfo, fallback }: IConfirmClient) => {
  const clientService = new ClientService();
  let clientId;

  try {
    const result = await clientService.getClient(email);

    if (result.data && result.data.length > 0) {
      clientId = result.data[0].id;
    } else {
      const createClient = await clientService.createClient(clientInfo, fallback);
      if (createClient.success && createClient.data) {
        clientId = createClient.data[0].id;
      }
    }

    return clientId;
  } catch (error) {
    console.error(error);
    return null;
  }
};

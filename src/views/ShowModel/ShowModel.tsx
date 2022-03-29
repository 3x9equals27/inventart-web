import ModelViewer from '../../components/ModelViewer/ModelViewer';
import styles from './ShowModel.module.css';
import Loading from '../../components/Loading/Loading';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
import { useSearchParams } from 'react-router-dom';

export interface ShowModelInterface {
  inventartApi: InventartApi,
  permissionManager: PermissionManager
}

const ShowModel = (props: ShowModelInterface) => {
  let inventartApi = props.inventartApi;
  let permissionManager = props.permissionManager;

  const [searchParams] = useSearchParams();
  const modelGuid: string = searchParams.get('model') ?? '';

  const promisseModelViewer = async (fileGuid: string): Promise<JSX.Element> => {
    var response = await inventartApi.fileLink(fileGuid);
    return <ModelViewer idx={1} url={response.payload} showEmbeddedButtons={true} />;
  };

  return (
    <div className={styles.mainBody}>
      <div className={styles.modelViewer}>
        <Loading condition={() => promisseModelViewer(modelGuid)} />
      </div>
    </div>);
};

export default ShowModel;

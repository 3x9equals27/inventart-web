import ModelViewer from '../../components/ModelViewer/ModelViewer';
import styles from './ShowModel.module.css';
import Loading from '../../components/Loading/Loading';
import { InventartApi } from '../../services/api/InventartApi';
import { PermissionManager } from '../../services/Authentication/PermissionManager';
const queryString = require('query-string');

const ShowModel = (inventartApi: InventartApi, permissionManager: PermissionManager) => {
  const qs = queryString.parse(window.location.search);

  const promisseModelViewer = async (fileGuid: string): Promise<JSX.Element> => {
    var response = await inventartApi.fileLink(fileGuid);
    return <ModelViewer idx={1} url={response.payload} showEmbeddedButtons={true} />;
  };

  return (
    <div className={styles.mainBody}>
      <div className={styles.modelViewer}>
        <Loading condition={() => promisseModelViewer(qs.model)} />
      </div>
    </div>);
};

export default ShowModel;

/*
 * This file is part of NER's PM Dashboard and licensed under GNU AGPLv3.
 * See the LICENSE file in the repository root folder for details.
 */

import PageBlock from '../page-block/page-block';
import styles from './bullet-list.module.css';
import { Form, Button, InputGroup } from 'react-bootstrap';

interface BulletListProps {
  title: string;
  headerRight: JSX.Element;
  list: JSX.Element[];
  ordered?: boolean;
  editMode?: boolean;
}

const BulletList: React.FC<BulletListProps> = ({ title, headerRight, list, ordered, editMode }) => {
  console.log(list[0].props.children);
  const addButton = (
    <InputGroup>
      <Form.Control type="text" placeholder="Input new bullet here" />
      <Button variant="success">+</Button>
    </InputGroup>
  );
  let listPrepared = list.map((bullet, idx) =>
    editMode ? (
      <InputGroup>
        <Form.Control type="text" placeholder={bullet.props.children} key={`${idx}`} />
        <Button variant="danger">X</Button>
      </InputGroup>
    ) : (
      <li key={idx}>{bullet}</li>
    )
  );
  if (editMode) {
    listPrepared = [...listPrepared, addButton];
  }
  let builtList = <ul className={styles.bulletList}>{listPrepared}</ul>;
  if (ordered) {
    builtList = <ol className={styles.bulletList}>{listPrepared}</ol>;
  }
  if (editMode) {
    builtList = <Form>{listPrepared}</Form>;
  }
  return <PageBlock title={title} headerRight={headerRight} body={builtList} />;
};

export default BulletList;

//editMode ? <Form.Control type="text" placeholder={bullet.key ? bullet.key : ' '} key={`${idx}`} /> : <li key={idx}>{bullet}</li>

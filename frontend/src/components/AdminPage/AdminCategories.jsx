// AdminCategories.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AdminCategories.module.css";

const api = "https://i9b103.p.ssafy.io/api/";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCategoryItem, setNewCategoryItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  const handleCloseModal = () => {
    setShowModal(false);
    setNewCategoryItem("");
  };

  // Fetch categories on component mount and whenever the current page changes
  useEffect(() => {
    axios
      .get(`${api}category/list`, {
        params: {
          page: currentPage,
          size: itemsPerPage,
        },
      })
      .then((response) => {
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("카테고리 리스트를 불러오는데 실패했습니다.", error);
      });
  }, [currentPage]);

  const handleDelete = (categorySeq) => {
    axios
      .delete(`${api}category/${categorySeq}`)
      .then(() => {
        setCategories((prevCategories) =>
          prevCategories.filter(
            (category) => category.categorySeq !== categorySeq
          )
        );
      })
      .catch((error) => {
        console.error("카테고리 삭제 중 오류가 발생했습니다.", error);
      });
  };

  const handleCreateCategory = () => {
    console.log(newCategoryItem);
    axios
      .post(`${api}category/regist`, {
        item: newCategoryItem,
      })
      .then(() => {
        axios
          .get(`${api}category/list`, {
            params: {
              page: currentPage,
              size: itemsPerPage,
            },
          })
          .then((response) => {
            setCategories(response.data);
            setShowModal(false);
            setNewCategoryItem("");
          })
          .catch((error) => {
            console.error("카테고리 리스트를 불러오는데 실패했습니다.", error);
          });
      })
      .catch((error) => {
        console.error("카테고리 등록 중 오류가 발생했습니다.", error);
      });
  };

  // Calculate total pages for pagination
  const totalPages = Math.ceil(categories.length / itemsPerPage);

  // Change the current page
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  // Generate page numbers for pagination
  const pageNumbers = [];
  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  return (
    <div className={classes.admin_categories_container}>
      <h1>카테고리 목록</h1>
      {/* 카테고리 추가 버튼 */}
      <div className={classes.plus_category}>
        <button onClick={() => setShowModal(true)}>카테고리 추가</button>
      </div>

      {/* 카테고리 목록 표시 */}
      <table className={classes.categories_table}>
        <thead>
          <tr>
            <th>등록 번호</th>
            <th>카테고리 이름</th>
            <th>비고</th>
          </tr>
        </thead>
        <tbody>
          {categories.map((category) => (
            <tr key={category.categorySeq}>
              <td>{category.categorySeq}</td>
              <td>{category.item}</td>
              <td>
                <button
                  style={{ color: "red" }}
                  onClick={() => handleDelete(category.categorySeq)}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Pagination */}
      <ul className={classes.pagination}>
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={currentPage === number ? classes.active : null}
            onClick={() => handlePageChange(number)}
          >
            {number}
          </li>
        ))}
      </ul>

      {/* 카테고리 추가 모달 */}
      {showModal && (
        <div className={classes.modal} onClick={handleCloseModal}>
          <div
            className={classes.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>새로운 카테고리 추가</h2>
            <label>
              카테고리 이름:
              <input
                type="text"
                value={newCategoryItem}
                onChange={(e) => setNewCategoryItem(e.target.value)}
                placeholder="카테고리 이름을 입력하세요"
              />
            </label>
            <div className={classes.modal_buttons}>
              <button onClick={handleCreateCategory}>생성</button>
              <button onClick={handleCloseModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;

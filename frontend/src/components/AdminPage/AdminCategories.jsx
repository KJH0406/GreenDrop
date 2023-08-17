// AdminCategories.jsx
import { useState, useEffect } from "react";
import axios from "axios";
import classes from "./AdminCategories.module.css";

const api = "https://i9b103.p.ssafy.io/api/";

function AdminCategories() {
  const [categories, setCategories] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [showModifyModal, setShowModifyModal] = useState(false);
  const [createdDate, setCreatedDate] = useState(null);
  const [categorySeq, setCategorySeq] = useState(0);
  const [modifyCategoryItem, setModifyCategoryItem] = useState(null);
  const [newCategoryItem, setNewCategoryItem] = useState("");
  const [currentPage, setCurrentPage] = useState(1);
  const [categoryUpdate, setCategoryUpdate] = useState(false);
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
        console.log(response);
        setCategories(response.data);
      })
      .catch((error) => {
        console.error("카테고리 리스트를 불러오는데 실패했습니다.", error);
      });
  }, [currentPage, categoryUpdate]);

  const handleDelete = (categorySeq) => {
    if (window.confirm("해당 카테고리를 삭제 하시겠습니까?")) {
      axios
        .delete(`${api}category/${categorySeq}`)
        .then(() => {
          setCategories((prevCategories) =>
            prevCategories.filter(
              (category) => category.categorySeq !== categorySeq,
            ),
          );
          alert("카테고리 삭제를 성공했습니다.");
        })
        .catch((error) => {
          console.error("카테고리 삭제 중 오류가 발생했습니다.", error);
          alert("카테고리 삭제를 실패했습니다.");
        });
    } else {
      alert("삭제를 취소했습니다.");
    }
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

  const handleModifyCategory = () => {
    const data = {
      item: modifyCategoryItem,
      createdDate: createdDate,
    };

    if (window.confirm("수정하시겠습니까?")) {
      axios
        .patch(`${api}category/${categorySeq}`, data)
        .then((response) => {
          setCategoryUpdate(!categoryUpdate);
          setShowModifyModal(false);

          alert("수정이 완료됐습니다.");
        })
        .catch((error) => {
          alert("수정에 실패했습니다.");
        });
    } else {
      alert("수정을 취소했습니다.");
    }
  };
  const handleCloseModifyModal = () => {
    setCategorySeq(0);
    setModifyCategoryItem(null);
    setCreatedDate(null);
    setShowModifyModal(false);
  };
  return (
    <div className={classes.admin_categories_container}>
      <h1>카테고리 목록</h1>
      {/* 카테고리 추가 버튼 */}
      <div className={classes.plus_category}>
        <button
          onClick={() => setShowModal(true)}
          className={classes.category_add_btn}
        >
          카테고리 추가
        </button>
      </div>

      {/* 카테고리 목록 표시 */}
      <table className={classes.categories_table}>
        <thead>
          <tr className={classes.table_title}>
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
                  className={classes.modify_button}
                  onClick={() => {
                    setCategorySeq(category.categorySeq);
                    setModifyCategoryItem(category.item);
                    setCreatedDate(category.createdDate);
                    setShowModifyModal(true);
                  }}
                >
                  수정
                </button>
                <button
                  onClick={() => handleDelete(category.categorySeq)}
                  className={classes.delete_btn}
                >
                  삭제
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className={classes.page_area}>
        {/* Pagination */}
        <div className={classes.pagination}>
          {pageNumbers.map((number) => (
            <button
              key={number}
              onClick={() => handlePageChange(number)}
              className={classes.page_btn}
            >
              {number}
            </button>
          ))}
        </div>
      </div>
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
      {showModifyModal && (
        <div className={classes.modal} onClick={handleCloseModal}>
          <div
            className={classes.modal_content}
            onClick={(e) => e.stopPropagation()}
          >
            <h2>기존 카테고리 수정</h2>
            <label>
              카테고리 이름:
              <input
                type="text"
                value={modifyCategoryItem}
                onChange={(e) => setModifyCategoryItem(e.target.value)}
                placeholder="카테고리 이름을 입력하세요"
              />
            </label>
            <div className={classes.modal_buttons}>
              <button onClick={handleModifyCategory}>수정</button>
              <button onClick={handleCloseModifyModal}>닫기</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default AdminCategories;

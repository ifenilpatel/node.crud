import db from '../models/index.js';
const { Sequelize, Department } = db;

import { HTTP_STATUS, STATUS_CODE, PAGINATION } from '../../constants/constant.js';

import asyncHandler from '../../utils/asyncHandler.js';
import ApiError from '../../utils/ApiError.js';
import ApiResponse from '../../utils/ApiResponse.js';

import DepartmentDTO from '../dtos/department.dto.js';

export const onSelection = asyncHandler(async (req, res) => {
  const fetchData = await Department.findAll({});
  if (fetchData.length == 0) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      statusCode: STATUS_CODE.RECORD_NOT_FOUND,
      message: 'Departments not found.',
    });
  }

  const formatted = DepartmentDTO.toSelection(fetchData);
  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse({ statusCode: STATUS_CODE.OK, message: 'Departments fetched successfully.', data: formatted }),
    );
});

export const onSelectById = asyncHandler(async (req, res) => {
  const { department_id } = req.params;

  const fetchData = await Department.findByPk(department_id);
  if (!fetchData) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      statusCode: STATUS_CODE.RECORD_NOT_FOUND,
      message: 'Department not found.',
    });
  }

  const formatted = DepartmentDTO.toDto(fetchData);
  res
    .status(HTTP_STATUS.OK)
    .json(
      new ApiResponse({ statusCode: STATUS_CODE.OK, message: 'Department fetched successfully.', data: formatted }),
    );
});

export const onSelectAll = asyncHandler(async (req, res) => {
  const pageIndex = parseInt(req.query.pageIndex) || PAGINATION.PAGEINDEX;
  const pageSize = parseInt(req.query.pageSize) || PAGINATION.PAGESIZE;
  const offset = (pageIndex - 1) * pageSize;

  const { rows: fetchData, count: totalRecords } = await Department.findAndCountAll({
    offset,
    limit: pageSize,
    order: [['created_at', 'DESC']],
  });

  if (totalRecords === 0) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      statusCode: STATUS_CODE.RECORD_NOT_FOUND,
      message: 'Departments not found.',
    });
  }

  const totalPages = Math.ceil(totalRecords / pageSize);

  const formatted = DepartmentDTO.toList(fetchData);
  res.status(HTTP_STATUS.OK).json(
    new ApiResponse({
      statusCode: STATUS_CODE.OK,
      message: 'Department fetched successfully.',
      data: formatted,
      extra: {
        totalRecords,
        totalPages,
        pageIndex,
        pageSize,
      },
    }),
  );
});

export const onInsert = asyncHandler(async (req, res) => {
  const request = new DepartmentDTO(req.body);

  const findData = await Department.findOne({ where: { title: request.title } });
  if (findData) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      statusCode: STATUS_CODE.RECORD_EXISTS,
      message: 'Try another department title.',
    });
  }

  const dbData = {
    title: request.title,
  };

  await Department.create(dbData);
  res
    .status(HTTP_STATUS.CREATED)
    .json(new ApiResponse({ statusCode: STATUS_CODE.OK, message: 'Department cerated successfully.' }));
});

export const onUpdate = asyncHandler(async (req, res) => {
  const { department_id } = req.params;
  const request = new DepartmentDTO(req.body);

  const findData = await Department.findByPk(department_id);
  if (!findData) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      statusCode: STATUS_CODE.RECORD_NOT_FOUND,
      message: 'Department not found.',
    });
  }

  const duplicateData = await Department.findOne({
    where: {
      title: request.title,
      department_id: {
        [Sequelize.Op.ne]: department_id,
      },
    },
  });
  if (duplicateData) {
    throw new ApiError({
      status: HTTP_STATUS.CONFLICT,
      statusCode: STATUS_CODE.RECORD_EXISTS,
      message: 'Try another department title.',
    });
  }

  findData.title = request.title;

  await findData.save();
  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse({ statusCode: STATUS_CODE.OK, message: 'Department updated successfully.' }));
});

export const onDeleteById = asyncHandler(async (req, res) => {
  const { department_id } = req.params;

  const fetchData = await Department.findByPk(department_id);
  if (!fetchData) {
    throw new ApiError({
      status: HTTP_STATUS.NOT_FOUND,
      statusCode: STATUS_CODE.RECORD_NOT_FOUND,
      message: 'Department not found.',
    });
  }

  await Department.destroy({ where: { department_id: department_id } });

  res
    .status(HTTP_STATUS.OK)
    .json(new ApiResponse({ statusCode: STATUS_CODE.OK, message: 'Department deleted successfully.' }));
});
